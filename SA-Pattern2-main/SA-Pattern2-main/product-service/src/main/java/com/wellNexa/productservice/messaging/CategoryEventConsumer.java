package com.wellNexa.productservice.messaging;

//import com.ecommerce.productservice.dto.CategoryEventDto;
//import com.ecommerce.productservice.service.ProductCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.wellNexa.productservice.dtos.CategoryEventDto;
import com.wellNexa.productservice.services.ProductService;

@Service
public class CategoryEventConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryEventConsumer.class);

    private final ProductService productService;

    public CategoryEventConsumer(ProductService productCategoryService) {
        this.productService = productCategoryService;
    }

    @RabbitListener(queues = "${rabbitmq.queue.category}")
    public void consumeCategoryEvent(CategoryEventDto categoryEventDto) {
        LOGGER.info("Received category event: {}", categoryEventDto);
        
        switch (categoryEventDto.getEventType()) {
            case "CREATE":
                productService.handleCategoryCreated(categoryEventDto);
                break;
            case "UPDATE":
                productService.handleCategoryUpdated(categoryEventDto);
                break;
            case "DELETE":
                productService.handleCategoryDeleted(categoryEventDto);
                break;
            default:
                LOGGER.warn("Unknown event type: {}", categoryEventDto.getEventType());
        }
    }
}

