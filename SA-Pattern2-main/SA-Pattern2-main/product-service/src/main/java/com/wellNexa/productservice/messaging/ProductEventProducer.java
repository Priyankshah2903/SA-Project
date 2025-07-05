package com.wellNexa.productservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.wellNexa.productservice.dtos.ProductEventDto;

@Service
@Slf4j
public class ProductEventProducer {
    
    @Autowired
    private RabbitTemplate rabbitTemplate;
    
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    
    @Value("${rabbitmq.routing-key.product}")
    private String routingKey;
    
    public void publishProductEvent(ProductEventDto productEventDto) {
        log.info("Publishing product event: {}", productEventDto);
        rabbitTemplate.convertAndSend(exchange, routingKey, productEventDto);
        log.info("Product event published successfully");
    }
}
