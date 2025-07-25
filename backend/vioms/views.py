from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework import serializers
from .serializers import *
from django.contrib.auth.models import User
from .models import CustomUser
from rest_framework.permissions import AllowAny, IsAuthenticated
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [AllowAny]
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


# def home_view(request):
#     # return HttpResponse("Welcome to the home page of IOMS - Inventory Operations Management System")
#     return render(request, 'home.html',{'name':'Meet Arora'})
# def about_view(request):
#     # return HttpResponse("Welcome to the about page of IOMS - Inventory Operations Management System")
#     return render(request, 'about.html')
