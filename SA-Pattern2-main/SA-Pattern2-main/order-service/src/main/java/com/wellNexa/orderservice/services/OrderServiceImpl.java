package com.wellNexa.orderservice.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wellNexa.orderservice.dtos.*;
import com.wellNexa.orderservice.enums.EOrderPaymentStatus;
import com.wellNexa.orderservice.enums.EOrderStatus;
import com.wellNexa.orderservice.exceptions.ResourceNotFoundException;
import com.wellNexa.orderservice.exceptions.ServiceLogicException;
import com.wellNexa.orderservice.feigns.CartService;
import com.wellNexa.orderservice.feigns.NotificationService;
import com.wellNexa.orderservice.feigns.UserService;
import com.wellNexa.orderservice.messaging.CartEventProducer;
import com.wellNexa.orderservice.messaging.OrderNotificationProducer;
import com.wellNexa.orderservice.modals.Order;
import com.wellNexa.orderservice.repositories.OrderRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Component
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;
    
    // rabbitmq code
    @Autowired
    private OrderNotificationProducer orderNotificationProducer;
    
    @Autowired
    private CartEventProducer cartEventProducer;


//    public ResponseEntity<ApiResponseDto<?>> createOrder(String token, OrderRequestDto request) throws ResourceNotFoundException, ServiceLogicException {
//
//        try {
//
//            CartDto cart = cartService.getCartById(request.getCartId(), token).getBody().getResponse();
//            UserDto user = userService.getUserById(cart.getUserId()).getBody().getResponse();
//
//            if (user==null || cart == null || cart.getCartItems().isEmpty()) {
//                throw new ResourceNotFoundException("No items in the cart!");
//            }
//
//            Order order = orderRequestDtoToOrder(request, cart);
//            order = orderRepository.insert(order);
//            try {
//                if (order.getId() != null && clearCart(cart, token) && sendConfirmationEmail(user, order)) {
//                    return ResponseEntity.ok(
//                            ApiResponseDto.builder()
//                                    .isSuccess(true)
//                                    .message("Order has been successfully placed!")
//                                    .build()
//                    );
//                }
//                throw new ServiceLogicException("Unable to proceed order!");
//            }catch (Exception e) {
//                orderRepository.deleteById(order.getId());
//                throw new ServiceLogicException(e.getMessage());
//            }
//
//        }catch (ResourceNotFoundException e) {
//            throw new ResourceNotFoundException(e.getMessage());
//        }catch (Exception e) {
//            log.error("Failed to create order: " + e.getMessage());
//            throw new ServiceLogicException("Unable to proceed order!");
//        }
//    }

    // rabbitmq code
//    public ResponseEntity<ApiResponseDto<?>> createOrder(String token, OrderRequestDto request) throws ResourceNotFoundException, ServiceLogicException {
//
//        try {
//
//            CartDto cart = cartService.getCartById(request.getCartId(), token).getBody().getResponse();
//            UserDto user = userService.getUserById(cart.getUserId()).getBody().getResponse();
//
//            if (user==null || cart == null || cart.getCartItems().isEmpty()) {
//                throw new ResourceNotFoundException("No items in the cart!");
//            }
//
//            Order order = orderRequestDtoToOrder(request, cart);
//            Order savedOrder = orderRepository.insert(order); // Capture the saved order
//
//            try {
//                if (savedOrder.getId() != null && clearCart(cart, token)) {
//                    // Send notification after successful order placement
//                    sendOrderStatusNotification(savedOrder, user);
//                    return ResponseEntity.ok(
//                            ApiResponseDto.builder()
//                                    .isSuccess(true)
//                                    .message("Order has been successfully placed!")
//                                    .build()
//                    );
//                }
//                throw new ServiceLogicException("Unable to proceed order!");
//            }catch (Exception e) {
//                orderRepository.deleteById(savedOrder.getId());
//                throw new ServiceLogicException(e.getMessage());
//            }
//
//        }catch (ResourceNotFoundException e) {
//            throw new ResourceNotFoundException(e.getMessage());
//        }catch (Exception e) {
//            log.error("Failed to create order: " + e.getMessage());
//            throw new ServiceLogicException("Unable to proceed order!");
//        }
//    }
    
    // rabbitmq with cart
    public ResponseEntity<ApiResponseDto<?>> createOrder(String token, OrderRequestDto request) 
            throws ResourceNotFoundException, ServiceLogicException {

        try {
            System.out.println("Line 85: ");

            // Retrieve the cart and user details
            CartDto cart = cartService.getCartById(request.getCartId(), token).getBody().getResponse();
            UserDto user = userService.getUserById(cart.getUserId()).getBody().getResponse();

            if (user == null || cart == null || cart.getCartItems().isEmpty()) {
                throw new ResourceNotFoundException("No items in the cart!");
            }

            // Convert the OrderRequestDto to an Order entity and insert it into the repository
            Order order = orderRequestDtoToOrder(request, cart);
            Order savedOrder = orderRepository.insert(order); // Capture the saved order

            try {
                // Check if the order has been saved and the cart is cleared successfully
                if (savedOrder.getId() != null ) {
                	
                    // Call the new method to send the cart clear event after a successful order creation
                    sendCartClearEvent(savedOrder);

                    // Send the notification after the successful placement of the order
                    sendOrderStatusNotification(savedOrder, user);

                    return ResponseEntity.ok(
                            ApiResponseDto.builder()
                                    .isSuccess(true)
                                    .message("Order has been successfully placed!")
                                    .build()
                    );
                }
                throw new ServiceLogicException("Unable to proceed order!");
            } catch (Exception e) {
                // In case of any issues after inserting the order, roll back the order insertion
                orderRepository.deleteById(savedOrder.getId());
                throw new ServiceLogicException(e.getMessage());
            }

        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException(e.getMessage());
        } catch (Exception e) {
            log.error("Failed to create order: " + e.getMessage());
            throw new ServiceLogicException("Unable to proceed order!");
        }
    }

    public ResponseEntity<ApiResponseDto<?>> getOrdersByUser(String userId) throws ServiceLogicException {
        try {
            Set<Order> orders = orderRepository.findByUserIdOrderByIdDesc(userId);
            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .message(orders.size() + " orders found!")
                            .response(orders)
                            .build()
            );
        }catch (Exception e) {
            log.error("Failed to create order: " + e.getMessage());
            throw new ServiceLogicException("Unable to find orders!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getAllOrders() throws ServiceLogicException {
        try {
            List<Order> orders = orderRepository.findAll();
            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .message(orders.size() + " orders found!")
                            .response(orders)
                            .build()
            );
        }catch (Exception e) {
            log.error("Failed to create order: " + e.getMessage());
            throw new ServiceLogicException("Unable to find orders!");
        }
    }


    @Override
    public ResponseEntity<ApiResponseDto<?>> cancelOrder(String orderId) throws ServiceLogicException, ResourceNotFoundException {
        try {
        	System.out.println("Line 158: ");

            if(orderRepository.existsById(orderId)) {
                Order order = orderRepository.findById(orderId).orElse(null);
                order.setOrderStatus(EOrderStatus.CANCELLED);
                orderRepository.save(order);
                return ResponseEntity.ok(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Order successfully cancelled")
                                .build()
                );
            }
        }catch (Exception e) {
            log.error("Failed to create order: " + e.getMessage());
            throw new ServiceLogicException("Unable to find orders!");
        }
        throw new ResourceNotFoundException("Order not found with id " + orderId);
    }

    private boolean clearCart(CartDto cart, String token) {
        return Objects.requireNonNull(cartService.clearCartById(cart.getCartId(), token).getBody()).isSuccess();
    }
    
    //rabbitmq code 
    private void sendCartClearEvent(Order order) {
        OrderCompletedEvent event = OrderCompletedEvent.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .orderDate(new Date())
                .orderTotal(order.getOrderAmt())
                .build();
        
        cartEventProducer.sendCartClearEvent(event);
    }
    
    //rabbitmq code
    private void sendOrderStatusNotification(Order order, UserDto user) {
    	System.out.println("Line 184: ");

        // Build the email content using StringBuilder to match a similar format to method 2
        StringBuilder contentBuilder = new StringBuilder();
        contentBuilder.append("Dear " + user.getUsername() + ",<br><br>")
                      .append("<h2>Order Status Update</h2>")
                      .append("<p>Your order with order id as: #")
                      .append(order.getId())
                      .append(" has been successfully placed!</p>")
//                      .append(" status has been updated to <strong>")
//                      .append(order.getOrderStatus())
//                      .append("</strong>.</p><br>")
                      .append("<h3>Order Summary</h3>");

        // Iterate through each order item and append its details
        for (CartItemDto item : order.getOrderItems()) {
            // Format each item's details: product name, quantity, and price
            String itemDescription = item.getProductName() + ": " 
                                   + item.getQuantity() + " x " 
                                   + item.getPrice() + "<br>";
            contentBuilder.append(itemDescription);
        }

        // Append the order total and a thank you message
        contentBuilder.append("<h4>Total: ")
                      .append(order.getOrderAmt())
                      .append("</h4>")
                      .append("Thank you for shopping with us!<br>")
                      .append("Team - WellNexa");

        // Convert the built content to a string for the message body
        String message = contentBuilder.toString();
        String subject = "Order Status Update - WellNexa";

        // Build the OrderNotificationDto containing the order info, subject, and message
        OrderNotificationDto notificationDto = OrderNotificationDto.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .userEmail(user.getEmail())
                .orderStatus(order.getOrderStatus().toString())
                .subject(subject)
                .message(message)
                .build();

        // Send the notification via RabbitMQ
        orderNotificationProducer.sendOrderNotification(notificationDto);
    }


//    private boolean sendConfirmationEmail(UserDto user, Order order) {
//        StringBuilder contentBuilder = new StringBuilder("Dear " + user.getUsername() + ",<br><br>"
//                + "<h2>Thank you for your order!</h2>"
//                + "<p>Your order #" + order.getId() + " has been successfully placed!</p>"
//                + "<h3>Order summary</h3>");
//        for( CartItemDto item: order.getOrderItems()) {
//            String description = item.getProductName() + ": " + item.getQuantity() + " x " + item.getPrice() + "<br>";
//            contentBuilder.append(description);
//        }
//
//        String content = contentBuilder.toString();
//
//        content += "<h4>Total: " + order.getOrderAmt() + "</h4>"
//                + "<p>Delivery charges be will added to your total at your doorstep!</p>"
//                + "<br>Thank you,<br>"
//                + "Purely.";
//
//        MailRequestDto mail = MailRequestDto.builder()
//                .to(user.getEmail())
//                .subject("Purely - Order confirmation")
//                .body(content)
//                .build();
//
//        return notificationService.sendEmail(mail).getBody().isSuccess();
//    }

    private Order orderRequestDtoToOrder(OrderRequestDto request, CartDto cart) {
    	
    	System.out.println("Line 85ww: ");

        return Order.builder()
                .userId(cart.getUserId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .addressLine1(request.getAddressLine1())
                .addressLine2(request.getAddressLine2())
                .city(request.getCity())
                .phoneNo(request.getPhoneNo())
                .placedOn(LocalDateTime.now())
                .orderStatus(EOrderStatus.PENDING)
                .paymentStatus(EOrderPaymentStatus.PAID)
                .orderAmt(cart.getSubtotal())
                .orderItems(cart.getCartItems())
                .build();
    }

}
