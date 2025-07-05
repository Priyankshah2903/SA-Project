package com.wellNexa.orderservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellNexa.orderservice.config.RabbitMQConfig;
import com.wellNexa.orderservice.dtos.OrderCompletedEvent;

@Service
@Slf4j
public class CartEventProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendCartClearEvent(OrderCompletedEvent event) {
        log.info("Sending cart clear event for user: {}", event.getUserId());
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            RabbitMQConfig.CART_CLEAR_ROUTING_KEY,
            event
        );
        log.info("Cart clear event sent to queue");
    }
}
