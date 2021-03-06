# Generated by Django 2.1.7 on 2019-03-31 13:24

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0006_auto_20190329_2257'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='parent_id',
        ),
        migrations.AddField(
            model_name='post',
            name='parent',
            field=models.ForeignKey(
                null=True, on_delete=django.db.models.deletion.CASCADE, to='questions.Post'),
        ),
        migrations.AddField(
            model_name='post',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(max_length=150),
        ),
        migrations.AddIndex(
            model_name='post',
            index=django.contrib.postgres.indexes.GinIndex(
                fields=['search_vector'], name='questions_p_search__4facfa_gin'),
        ),
    ]
