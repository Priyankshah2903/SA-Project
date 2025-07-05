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
public class CartEvent implements Serializable {
    private String userId;
    private String productId;
    private Integer quantity;
    private String eventType; // ITEM_ADDED, ITEM_REMOVED, CART_CLEARED
    private Date timestamp;
}
