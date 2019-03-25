from datetime import datetime
from django.db import models


class Post(models.Model):
    id = models.BigIntegerField(primary_key=True)
    post_type = models.SmallIntegerField(default=1)
    parent_id = models.BigIntegerField(null=True)
    accepted_answer = models.BigIntegerField(null=True)
    score = models.SmallIntegerField()
    view_count = models.IntegerField(null=True)
    answer_count = models.SmallIntegerField(null=True)
    title = models.CharField(max_length=150, null=True)
    body = models.TextField()
    comment_count = models.SmallIntegerField()
    creation_date = models.DateTimeField(default=datetime.now)
    last_edit_date = models.DateTimeField(null=True)
    last_activity_date = models.DateTimeField(null=True)


class Comment(models.Model):
    id = models.BigIntegerField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField(null=True)
    creation_date = models.DateTimeField(default=datetime.now)
