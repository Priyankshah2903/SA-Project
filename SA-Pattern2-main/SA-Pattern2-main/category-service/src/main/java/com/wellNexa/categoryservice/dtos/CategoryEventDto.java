package com.wellNexa.categoryservice.dtos;


import java.io.Serializable;

public class CategoryEventDto implements Serializable {
    private String categoryId;
    private String name;
    private String description;
    private String eventType; // CREATE, UPDATE, DELETE

    // Default constructor required for serialization
    public CategoryEventDto() {
    }

    public CategoryEventDto(String categoryId, String name, String description, String eventType) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.eventType = eventType;
    }

    // Getters and setters
    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    @Override
    public String toString() {
        return "CategoryEventDto{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", eventType='" + eventType + '\'' +
                '}';
    }
}

