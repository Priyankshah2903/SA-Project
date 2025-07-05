package com.wellNexa.categoryservice.messaging;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.wellNexa.categoryservice.dtos.CategoryEventDto;

@Service
public class CategoryEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.routing-key.category}")
    private String routingKey;

    public CategoryEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishCategoryEvent(CategoryEventDto eventDTO) {
        rabbitTemplate.convertAndSend(exchange, routingKey, eventDTO);
        System.out.println("Category event sent: " + eventDTO);
    }
}

