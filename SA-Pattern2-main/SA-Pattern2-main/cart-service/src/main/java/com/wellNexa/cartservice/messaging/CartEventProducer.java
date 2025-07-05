package com.wellNexa.cartservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellNexa.cartservice.config.RabbitMQConfig;
import com.wellNexa.cartservice.dtos.CartEvent;

@Service
@Slf4j
public class CartEventProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publishCartEvent(CartEvent cartEvent) {
        log.info("Publishing cart event: {}", cartEvent);
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            RabbitMQConfig.CART_ROUTING_KEY,
            cartEvent
        );
        log.info("Cart event published to queue");
    }
}
