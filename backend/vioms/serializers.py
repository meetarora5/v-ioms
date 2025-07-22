from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class AdminUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'user']
        read_only_fields = ['id']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        password = user_data.pop('password')

        user = User(**user_data)
        user.set_password(password)
        user.save()

        admin_user = CustomUser.objects.create(user=user, **validated_data)
        return admin_user

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            password = user_data.pop('password', None)
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            if password:
                instance.user.set_password(password)  
            instance.user.save()

        instance.save()
        return instance
    

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
