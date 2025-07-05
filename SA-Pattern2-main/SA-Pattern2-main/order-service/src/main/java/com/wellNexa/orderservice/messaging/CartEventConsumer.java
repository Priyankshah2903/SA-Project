package com.wellNexa.orderservice.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wellNexa.orderservice.dtos.CartEvent;
import com.wellNexa.orderservice.services.OrderService;

@Component
@Slf4j
public class CartEventConsumer {

    @Autowired
    private OrderService orderService;

    @RabbitListener(queues = "${cart-queue}")
    public void consumeCartEvent(CartEvent event) {
        log.info("Received cart event: {}", event);
        try {
            // Process the cart event based on its type
            switch (event.getEventType()) {
                case "ITEM_ADDED":
                    processItemAdded(event);
                    break;
                case "ITEM_REMOVED":
                    processItemRemoved(event);
                    break;
                case "CART_CLEARED":
                    processCartCleared(event);
                    break;
                default:
                    log.warn("Unknown event type: {}", event.getEventType());
            }
        } catch (Exception e) {
            log.error("Error processing cart event: {}", e.getMessage(), e);
        }
    }

    private void processItemAdded(CartEvent event) {
        // Implementation to handle item added to cart
        // For example, pre-validate inventory, prepare for potential checkout
        log.info("Processing ITEM_ADDED event for user: {}, product: {}", 
                event.getUserId(), event.getProductId());
        // orderService.preValidateInventory(event.getUserId(), event.getProductId(), event.getQuantity());
    }

    private void processItemRemoved(CartEvent event) {
        // Implementation to handle item removed from cart
        log.info("Processing ITEM_REMOVED event for user: {}, product: {}", 
                event.getUserId(), event.getProductId());
        // orderService.updatePendingOrderPreparation(event.getUserId());
    }

    private void processCartCleared(CartEvent event) {
        // Implementation to handle cart cleared
        log.info("Processing CART_CLEARED event for user: {}", event.getUserId());
        // orderService.cancelPendingOrderPreparation(event.getUserId());
    }
}
