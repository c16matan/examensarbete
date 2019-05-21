from datetime import datetime
from django.db import models
from django.contrib.postgres.search import SearchVectorField
from django.contrib.postgres.indexes import GinIndex
from django.utils.html import strip_tags


class Post(models.Model):
    id = models.BigIntegerField(primary_key=True)
    post_type = models.SmallIntegerField(default=1)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    accepted_answer = models.BigIntegerField(null=True)
    score = models.SmallIntegerField()
    title = models.CharField(max_length=150)
    body = models.TextField()
    creation_date = models.DateTimeField(default=datetime.now)
    last_edit_date = models.DateTimeField(null=True)
    search_vector = SearchVectorField(null=True)

    @property
    def answer_count(self):
        return Post.objects.filter(post_type=2).filter(parent_id=self.id).count()

    @property
    def preview_body(self):
        return strip_tags(self.body)[:150]

    class Meta():
        indexes = [
            GinIndex(fields=['search_vector'])
        ]


class Comment(models.Model):
    id = models.BigIntegerField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField(null=True)
    creation_date = models.DateTimeField(default=datetime.now)
