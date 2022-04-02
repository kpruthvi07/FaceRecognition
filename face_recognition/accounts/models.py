from django.db import models
from django.contrib.auth.models import User
from PIL import Image

YEARS = [('P1','P1'),('P2','P2'),('E1','E1'),('E2','E2'),('E3','E3'),('E4','E4')]
BRANCHES = [('PUC1','PUC1'),('PUC2','PUC2'),('CSE','CSE'),('ECE','ECE'),('CE','CIVIL'),('ME','MECHANICAL'),('CHEM','CHEMICAL'),('MME','MME')]

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    image = models.ImageField(upload_to='profile_pics/', default='default.jpg')

    def __str__(self):
        return f'{self.user.username} - profile'

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.width>300 or img.height>300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    idno = models.CharField(max_length=7)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    year = models.CharField(max_length=10, choices=YEARS)
    branch = models.CharField(max_length=15, choices=BRANCHES)
    clsroom = models.CharField(max_length=10)
    mobile = models.CharField(max_length=10)
    p_mobile = models.CharField(max_length=10)
    dorm = models.CharField(max_length=10)
    block = models.CharField(max_length=10)
    village = models.CharField(max_length=20)
    mandal = models.CharField(max_length=20)
    district = models.CharField(max_length=20)
    pincode = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.user.username} - student'


class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    idno = models.CharField(max_length=7)
    name = models.CharField(max_length=50)
    mobile = models.CharField(max_length=10)
    village = models.CharField(max_length=20)
    mandal = models.CharField(max_length=20)
    district = models.CharField(max_length=20)
    pincode = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.user.username} - staff'
