package com.wellNexa.categoryservice.dtos;

import java.io.Serializable;

public class ProductEventDto implements Serializable {
    private String productId;
    private String productName;
    private String categoryId;
    private String eventType; // ADD, UPDATE, DELETE
    
    // Default constructor for serialization
    public ProductEventDto() {
    }
    
    // Getters and setters
    public String getProductId() {
        return productId;
    }
    
    public void setProductId(String productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getEventType() {
        return eventType;
    }
    
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    
    @Override
    public String toString() {
        return "ProductEventDto{" +
                "productId='" + productId + '\'' +
                ", productName='" + productName + '\'' +
                ", categoryId='" + categoryId + '\'' +
                ", eventType='" + eventType + '\'' +
                '}';
    }
}
