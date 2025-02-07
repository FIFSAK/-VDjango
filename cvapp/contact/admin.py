from django.contrib import admin
from django.urls import path, include
from .models import Contact, CV

admin.site.register(Contact)
admin.site.register(CV)