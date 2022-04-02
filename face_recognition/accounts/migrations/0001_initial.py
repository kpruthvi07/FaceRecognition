# Generated by Django 3.0 on 2022-04-01 06:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('image', models.ImageField(default='default.jpg', upload_to='profile_pics/')),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('idno', models.CharField(max_length=7)),
                ('name', models.CharField(max_length=50)),
                ('mobile', models.CharField(max_length=10)),
                ('village', models.CharField(max_length=20)),
                ('mandal', models.CharField(max_length=20)),
                ('district', models.CharField(max_length=20)),
                ('pincode', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('idno', models.CharField(max_length=7)),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('year', models.CharField(choices=[('P1', 'P1'), ('P2', 'P2'), ('E1', 'E1'), ('E2', 'E2'), ('E3', 'E3'), ('E4', 'E4')], max_length=10)),
                ('branch', models.CharField(choices=[('PUC1', 'PUC1'), ('PUC2', 'PUC2'), ('CSE', 'CSE'), ('ECE', 'ECE'), ('CE', 'CIVIL'), ('ME', 'MECHANICAL'), ('CHEM', 'CHEMICAL'), ('MME', 'MME')], max_length=15)),
                ('clsroom', models.CharField(max_length=10)),
                ('mobile', models.CharField(max_length=10)),
                ('p_mobile', models.CharField(max_length=10)),
                ('dorm', models.CharField(max_length=10)),
                ('block', models.CharField(max_length=10)),
                ('village', models.CharField(max_length=20)),
                ('mandal', models.CharField(max_length=20)),
                ('district', models.CharField(max_length=20)),
                ('pincode', models.IntegerField(null=True)),
            ],
        ),
    ]