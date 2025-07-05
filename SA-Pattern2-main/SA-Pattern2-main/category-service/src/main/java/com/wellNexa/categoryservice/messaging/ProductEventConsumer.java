package com.wellNexa.categoryservice.messaging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.wellNexa.categoryservice.dtos.ProductEventDto;
import com.wellNexa.categoryservice.services.CategoryService;

@Service
public class ProductEventConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductEventConsumer.class);
    
    private final CategoryService categoryService;
    
    public ProductEventConsumer(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @RabbitListener(queues = "${rabbitmq.queue.product}")
    public void consumeProductEvent(ProductEventDto productEventDto) {
        LOGGER.info("Received product event: {}", productEventDto);
        
        switch (productEventDto.getEventType()) {
            case "ADD":
                categoryService.incrementProductCount(productEventDto.getCategoryId());
                break;
            case "UPDATE":
                // Handle product update - no action needed unless category changed
                break;
            case "DELETE":
                categoryService.decrementProductCount(productEventDto.getCategoryId());
                break;
            case "REMOVE_FROM_CATEGORY":
                categoryService.decrementProductCount(productEventDto.getCategoryId());
                break;
            case "ADD_TO_CATEGORY":
                categoryService.incrementProductCount(productEventDto.getCategoryId());
                break;
            default:
                LOGGER.warn("Unknown event type: {}", productEventDto.getEventType());
        }
    }
}
