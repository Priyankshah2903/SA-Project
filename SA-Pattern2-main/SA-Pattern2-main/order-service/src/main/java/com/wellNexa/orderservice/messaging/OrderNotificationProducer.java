package com.wellNexa.orderservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellNexa.orderservice.config.RabbitMQConfig;
import com.wellNexa.orderservice.dtos.OrderNotificationDto;

@Service
@Slf4j
public class OrderNotificationProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendOrderNotification(OrderNotificationDto notificationDto) {
        log.info("Sending order notification: {}", notificationDto);
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            RabbitMQConfig.ORDER_NOTIFICATION_ROUTING_KEY,
            notificationDto
        );
        log.info("Order notification sent to queue");
    }
}
