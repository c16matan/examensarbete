# Generated by Django 2.1.7 on 2019-03-25 12:19

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('text', models.TextField(null=True)),
                ('creation_date', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('post_type', models.SmallIntegerField(default=1)),
                ('parent_id', models.BigIntegerField(null=True)),
                ('accepted_answer', models.BigIntegerField(null=True)),
                ('score', models.SmallIntegerField()),
                ('view_count', models.IntegerField(null=True)),
                ('answer_count', models.SmallIntegerField(null=True)),
                ('title', models.CharField(max_length=150, null=True)),
                ('body', models.TextField()),
                ('comment_count', models.SmallIntegerField()),
                ('creation_date', models.DateTimeField(default=datetime.datetime.now)),
                ('last_edit_date', models.DateTimeField(null=True)),
                ('last_activity_date', models.DateTimeField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.Post'),
        ),
    ]