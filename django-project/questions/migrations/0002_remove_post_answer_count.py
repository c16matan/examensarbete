# Generated by Django 2.1.7 on 2019-03-27 18:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='answer_count',
        ),
    ]
