# Generated by Django 2.1.7 on 2019-03-31 17:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0008_auto_20190331_1324'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='last_activity_date',
        ),
        migrations.RemoveField(
            model_name='post',
            name='view_count',
        ),
    ]
