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

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    # def validate(self, data):
    #     user = User.objects.filter(username=data['username']).first()
    #     if user and user.check_password(data['password']):
    #         return user
    #     raise serializers.ValidationError("Invalid credentials")
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# 
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['product', 'product_id', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source='customer'
    )
    items = OrderItemSerializer(source='orderitem_set', many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_id', 'created_at', 'items','status']

    def create(self, validated_data):
        items_data = validated_data.pop('orderitem_set')
        order = Order.objects.create(**validated_data)

        for item in items_data:
            product = item['product']
            quantity = item['quantity']
            # Reduce product quantity
            if product.quantity >= quantity:
                product.quantity -= quantity
                product.save()
            else:
                raise serializers.ValidationError(f"Not enough stock for product {product.product_name}")
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity
            )
        return order
    #     read_only_fields = ['product']
    
    # def create(self, validated_data):
    #     order_item = OrderItem.objects.create(**validated_data)
    #     return order_item

    # def update(self, instance, validated_data):
    #     instance.quantity = validated_data.get('quantity', instance.quantity)
    #     instance.save()
    #     return instance
    