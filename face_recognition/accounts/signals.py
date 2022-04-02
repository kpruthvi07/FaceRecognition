from django.contrib.auth.models import User, Group
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Student, Profile, Staff

@receiver(post_save, sender=User)
def create_profile(sender,instance,created,**kwargs):
    if created:
        if instance.is_staff and not instance.is_superuser:
            Staff.objects.create(user=instance)
        elif not instance.is_staff:
            Student.objects.create(user=instance)
        if not instance.is_superuser:
            Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender,instance,**kwargs):
    if instance.is_staff and not instance.is_superuser:
        instance.staff.idno = instance.username
        staff_group = Group.objects.get(name='staff')
        instance.groups.add(staff_group)
        instance.staff.save()
    elif not instance.is_superuser:
        instance.student.idno = instance.username
        idno = instance.student.idno
        instance.profile.image = idno+'.jpg'
        instance.student.email = str(idno).lower()+'@rguktn.ac.in'
        student_group = Group.objects.get(name='student')
        instance.groups.add(student_group)
        instance.student.save()
    if not instance.is_superuser:
        instance.profile.save()
