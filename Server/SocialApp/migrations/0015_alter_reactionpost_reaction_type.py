# Generated by Django 5.0.2 on 2024-04-21 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SocialApp', '0014_alter_post_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reactionpost',
            name='reaction_type',
            field=models.CharField(choices=[('LIKE', 'Like'), ('HAHA', 'Haha'), ('HEART', 'Heart')], max_length=255),
        ),
    ]