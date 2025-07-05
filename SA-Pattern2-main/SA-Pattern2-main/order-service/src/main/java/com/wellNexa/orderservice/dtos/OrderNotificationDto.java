package com.wellNexa.orderservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderNotificationDto implements Serializable {
    private String orderId;
    private String userId;
    private String userEmail;
    private String orderStatus;
    private String message;
    private String subject;
}
