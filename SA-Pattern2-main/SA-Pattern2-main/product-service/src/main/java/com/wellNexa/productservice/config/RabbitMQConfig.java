//package com.dharshi.productservice.config;
//
//import org.springframework.amqp.core.*;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class RabbitMQConfig {
//
//    @Value("${rabbitmq.exchange.name}")
//    private String exchangeName;
//
//    @Value("${rabbitmq.queue.name}")
//    private String queueName;
//
//    @Value("${rabbitmq.routing-key}")
//    private String routingKey;
//
//    // Spring bean for RabbitMQ queue
//    @Bean
//    public Queue queue() {
//        return new Queue(queueName);
//    }
//
//    // Spring bean for RabbitMQ exchange
//    @Bean
//    public TopicExchange exchange() {
//        return new TopicExchange(exchangeName);
//    }
//
//    // Binding between queue and exchange using routing key
//    @Bean
//    public Binding binding() {
//        return BindingBuilder
//                .bind(queue())
//                .to(exchange())
//                .with(routingKey);
//    }
//
//    // Message converter
//    @Bean
//    public MessageConverter converter() {
//        return new Jackson2JsonMessageConverter();
//    }
//
//    // Configure RabbitTemplate
//    @Bean
//    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
//        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(converter());
//        return rabbitTemplate;
//    }
//}
//

//bi-directional implementation
package com.wellNexa.productservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    // For consuming category events
    @Value("${rabbitmq.queue.category}")
    private String categoryQueueName;
    
    // For producing product events
    @Value("${rabbitmq.queue.product}")
    private String productQueueName;

    @Value("${rabbitmq.routing-key.category}")
    private String categoryRoutingKey;
    
    @Value("${rabbitmq.routing-key.product}")
    private String productRoutingKey;

    // Queue for receiving category events
    @Bean
    public Queue categoryQueue() {
        return new Queue(categoryQueueName);
    }
    
    // Queue for sending product events
    @Bean
    public Queue productQueue() {
        return new Queue(productQueueName);
    }

    // Common exchange
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(exchangeName);
    }

    // Bind category queue to exchange
    @Bean
    public Binding categoryBinding() {
        return BindingBuilder
                .bind(categoryQueue())
                .to(exchange())
                .with(categoryRoutingKey);
    }
    
    // Bind product queue to exchange
    @Bean
    public Binding productBinding() {
        return BindingBuilder
                .bind(productQueue())
                .to(exchange())
                .with(productRoutingKey);
    }

    // Message converter for serialization/deserialization
    @Bean
    public MessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    // RabbitTemplate configuration
    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter());
        return rabbitTemplate;
    }
}

