//package com.dharshi.cartservice.messaging;
//
//import com.dharshi.cartservice.dtos.OrderCompletedEvent;
//import com.dharshi.cartservice.services.CartService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//
//@Component
//@Slf4j
//public class OrderEventConsumer {
//
//    @Autowired
//    private CartService cartService;
//
//    @RabbitListener(queues = "${rabbitmq.queue.cart}")
//    public void consumeOrderCompletedEvent(OrderCompletedEvent event) {
//        log.info("Received order completed event: {}", event);
//        try {
//            cartService.clearCartAfterOrderCompletion(event.getUserId(), event.getOrderId());
//            log.info("Cart cleared successfully for user: {}", event.getUserId());
//        } catch (Exception e) {
//            log.error("Failed to clear cart for user {}: {}", event.getUserId(), e.getMessage());
//        }
//    }
//}


package com.wellNexa.cartservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wellNexa.cartservice.dtos.OrderCompletedEvent;
import com.wellNexa.cartservice.services.CartService;

@Component
@Slf4j
public class OrderEventConsumer {

    @Autowired
    private CartService cartService;

    @RabbitListener(queues = "${cart-clear-queue}")
    public void consumeOrderCompletedEvent(OrderCompletedEvent event) {
        log.info("Received order completed event: {}", event);
        try {
            cartService.clearCartAfterOrderCompletion(event.getUserId(), event.getOrderId());
            log.info("Cart cleared successfully for user: {}", event.getUserId());
        } catch (Exception e) {
            log.error("Failed to clear cart for user {}: {}", event.getUserId(), e.getMessage());
        }
    }
}
