//package com.dharshi.orderservice.config;
//
//import org.springframework.amqp.core.*;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class RabbitMQConfig {
//
//    public static final String EXCHANGE = "purely-exchange";
//    public static final String ORDER_NOTIFICATION_QUEUE = "order-notification-queue";
//    public static final String ORDER_NOTIFICATION_ROUTING_KEY = "order.notification";
//    
// // New configuration for cart service communication
//    public static final String CART_CLEAR_QUEUE = "cart-clear-queue";
//    public static final String CART_CLEAR_ROUTING_KEY = "order.cart.clear";
//
//    @Bean
//    public Queue orderNotificationQueue() {
//        return new Queue(ORDER_NOTIFICATION_QUEUE);
//    }
//    
//    @Bean
//    public Queue cartClearQueue() {
//        return new Queue(CART_CLEAR_QUEUE);
//    }
//
//    @Bean
//    public TopicExchange exchange() {
//        return new TopicExchange(EXCHANGE);
//    }
//
//    @Bean
//    public Binding orderNotificationBinding(Queue orderNotificationQueue, TopicExchange exchange) {
//        return BindingBuilder.bind(orderNotificationQueue).to(exchange).with(ORDER_NOTIFICATION_ROUTING_KEY);
//    }
//    
//    @Bean
//    public Binding cartClearBinding(Queue cartClearQueue, TopicExchange exchange) {
//        return BindingBuilder.bind(cartClearQueue).to(exchange).with(CART_CLEAR_ROUTING_KEY);
//    }
//
//    @Bean
//    public MessageConverter messageConverter() {
//        return new Jackson2JsonMessageConverter();
//    }
//
//    @Bean
//    public AmqpTemplate template(ConnectionFactory connectionFactory) {
//        RabbitTemplate template = new RabbitTemplate(connectionFactory);
//        template.setMessageConverter(messageConverter());
//        return template;
//    }
//}

//bjdirectional
package com.wellNexa.orderservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    // Exchange
    public static final String EXCHANGE = "wellNexa-exchange";
    
    // Queues
    public static final String CART_QUEUE = "cart-queue";
    public static final String CART_CLEAR_QUEUE = "cart-clear-queue";
    public static final String ORDER_NOTIFICATION_QUEUE = "order-notification-queue";
    
    
    // Routing Keys
    public static final String CART_ROUTING_KEY = "cart";
    public static final String CART_CLEAR_ROUTING_KEY = "order.cart.clear";
    public static final String ORDER_NOTIFICATION_ROUTING_KEY = "order.notification";
    
    @Bean
    public Queue orderNotificationQueue() {
        return new Queue(ORDER_NOTIFICATION_QUEUE);
    }

    @Bean
    public Queue cartQueue() {
        return new Queue(CART_QUEUE);
    }

    @Bean
    public Queue cartClearQueue() {
        return new Queue(CART_CLEAR_QUEUE);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }
    
    @Bean
    public Binding orderNotificationBinding(Queue orderNotificationQueue, TopicExchange exchange) {
        return BindingBuilder.bind(orderNotificationQueue).to(exchange).with(ORDER_NOTIFICATION_ROUTING_KEY);
    }

    @Bean
    public Binding cartBinding(Queue cartQueue, TopicExchange exchange) {
        return BindingBuilder.bind(cartQueue).to(exchange).with(CART_ROUTING_KEY);
    }

    @Bean
    public Binding cartClearBinding(Queue cartClearQueue, TopicExchange exchange) {
        return BindingBuilder.bind(cartClearQueue).to(exchange).with(CART_CLEAR_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}

