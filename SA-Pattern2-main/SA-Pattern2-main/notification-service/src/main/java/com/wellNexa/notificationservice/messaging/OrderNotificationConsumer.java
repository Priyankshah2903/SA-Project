package com.wellNexa.notificationservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wellNexa.notificationservice.dtos.MailRequestDto;
import com.wellNexa.notificationservice.dtos.OrderNotificationDto;
import com.wellNexa.notificationservice.services.EmailNotificationService;

@Component
@Slf4j
public class OrderNotificationConsumer {

    @Autowired
    private EmailNotificationService emailNotificationService;

    @RabbitListener(queues = "${rabbitmq.queue.order}")
    public void consumeOrderNotification(OrderNotificationDto orderNotificationDto) {
        log.info("Received order notification: {}", orderNotificationDto);
        try {
            MailRequestDto mailRequestDto = MailRequestDto.builder()
                .to(orderNotificationDto.getUserEmail())
                .subject(orderNotificationDto.getSubject())
                .body(orderNotificationDto.getMessage())
                .build();
                
            emailNotificationService.sendEmail(mailRequestDto);
            log.info("Order notification email sent successfully");
        } catch (Exception e) {
            log.error("Failed to send order notification email: {}", e.getMessage());
        }
    }
}
