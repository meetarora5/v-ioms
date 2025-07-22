from django.db import models
from django.contrib.auth.models import User

class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.user.username}"


class Product(models.Model):
    product_name = models.CharField(max_length=100)
    sku = models.CharField(max_length=50,unique=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    quantity = models.PositiveIntegerField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product_name}-{self.sku}"
    

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    address = models.TextField()

    def __str__(self):
        return self.name
    
class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
    ]
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    def __str__(self):
        return f"Order {self.id} - {self.customer.name}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.product.product_name} x {self.quantity} (Order #{self.order.id})"