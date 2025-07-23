from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework import serializers
from .serializers import *
from django.contrib.auth.models import User
from .models import CustomUser

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# def home_view(request):
#     # return HttpResponse("Welcome to the home page of IOMS - Inventory Operations Management System")
#     return render(request, 'home.html',{'name':'Meet Arora'})
# def about_view(request):
#     # return HttpResponse("Welcome to the about page of IOMS - Inventory Operations Management System")
#     return render(request, 'about.html')
