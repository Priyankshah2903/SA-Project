package com.wellNexa.cartservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderCompletedEvent implements Serializable {
    private String orderId;
    private String userId;
    private Date orderDate;
    private Double orderTotal;
}
