package com.wellNexa.productservice.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wellNexa.productservice.dtos.ApiResponseDto;
import com.wellNexa.productservice.dtos.CategoryDto;
import com.wellNexa.productservice.dtos.CategoryEventDto;
import com.wellNexa.productservice.dtos.ProductEventDto;
import com.wellNexa.productservice.dtos.ProductRequestDto;
import com.wellNexa.productservice.exceptions.ResourceNotFoundException;
import com.wellNexa.productservice.exceptions.ServiceLogicException;
import com.wellNexa.productservice.feigns.CategoryService;
import com.wellNexa.productservice.messaging.ProductEventProducer;
import com.wellNexa.productservice.models.Product;
import com.wellNexa.productservice.repositories.ProductRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Slf4j
@Component
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;
    
    //bidirectional
    @Autowired
    private ProductEventProducer productEventProducer;
    
    //rabbitmq code
    private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);

//    private final ProductRepository productRepository;
    
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

//    @Override
//    public ResponseEntity<ApiResponseDto<?>> addProduct(ProductRequestDto requestDto) throws ServiceLogicException, ResourceNotFoundException {
//        try {
//            CategoryDto category = categoryService.getCategoryById(requestDto.getCategoryId()).getBody().getResponse();
//            if (category != null){
//                Product product = productDtoToProduct(requestDto, category);
//                productRepository.insert(product);
//                return ResponseEntity.ok(
//                        ApiResponseDto.builder()
//                                .isSuccess(true)
//                                .message("Product saved successfully!")
//                                .build()
//                );
//            }
//        }catch(Exception e) {
//            throw new ServiceLogicException("Unable save category!");
//        }
//        throw new ResourceNotFoundException("Category not found with id " + requestDto.getCategoryId());
//    }
    
    //bidirectional
    @Override
    public ResponseEntity<ApiResponseDto<?>> addProduct(ProductRequestDto requestDto) 
            throws ServiceLogicException, ResourceNotFoundException {
        try {
            // Create new product entity
            Product product = new Product();
            product.setProductName(requestDto.getProductName());
            product.setPrice(requestDto.getPrice());
            product.setDescription(requestDto.getDescription());
            product.setImageUrl(requestDto.getImageUrl());
            product.setCategoryId(requestDto.getCategoryId());
            
            // Save product
            Product savedProduct = productRepository.save(product);
            
            // Publish product added event
            ProductEventDto eventDto = new ProductEventDto(
                savedProduct.getId(),
                savedProduct.getProductName(),
                savedProduct.getCategoryId(),
                "ADD"
            );
            productEventProducer.publishProductEvent(eventDto);
            
            return ResponseEntity.ok(
                ApiResponseDto.builder()
                    .isSuccess(true)
                    .message("Product added successfully")
                    .response(savedProduct)
                    .build()
            );
        } catch (Exception e) {
            log.error("Failed to add product: {}", e.getMessage());
            throw new ServiceLogicException("Failed to add product: " + e.getMessage());
        }
    }

//    @Override
//    public ResponseEntity<ApiResponseDto<?>> editProduct(String productId, ProductRequestDto requestDto) throws ServiceLogicException, ResourceNotFoundException {
//        try {
//
//            CategoryDto category = categoryService.getCategoryById(requestDto.getCategoryId()).getBody().getResponse();
//            if (category == null)
//                throw new ResourceNotFoundException("Category not found with id " + requestDto.getCategoryId());
//
//            Product product = productRepository.findById(productId).orElse(null);
//            if (product == null)
//                throw new ResourceNotFoundException("Product not found with id " + productId);
//
//            product = productDtoToProduct(requestDto, category);
//            product.setId(productId);
//            productRepository.save(product);
//            return ResponseEntity.ok(
//                    ApiResponseDto.builder()
//                            .isSuccess(true)
//                            .message("Product edited successfully!")
//                            .build()
//            );
//        }catch(ResourceNotFoundException e) {
//            throw new ResourceNotFoundException(e.getMessage());
//        }catch(Exception e) {
//            throw new ServiceLogicException("Unable save category!");
//        }
//    }
    
    //bidirectional
    @Override
    public ResponseEntity<ApiResponseDto<?>> editProduct(String productId, ProductRequestDto requestDto) 
            throws ServiceLogicException, ResourceNotFoundException {
        try {
            // Find existing product
            Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
            
            // Store old category ID to detect category changes
            String oldCategoryId = existingProduct.getCategoryId();
            
            // Update product fields
            existingProduct.setProductName(requestDto.getProductName());
            existingProduct.setPrice(requestDto.getPrice());
            existingProduct.setDescription(requestDto.getDescription());
            existingProduct.setImageUrl(requestDto.getImageUrl());
            existingProduct.setCategoryId(requestDto.getCategoryId());
            
            // Save updated product
            Product updatedProduct = productRepository.save(existingProduct);
            
            // Publish update event
            ProductEventDto eventDto = new ProductEventDto(
                updatedProduct.getId(),
                updatedProduct.getProductName(),
                updatedProduct.getCategoryId(),
                "UPDATE"
            );
            productEventProducer.publishProductEvent(eventDto);
            
            // If category changed, send additional events
            if (!oldCategoryId.equals(updatedProduct.getCategoryId())) {
                // Event for old category (product removed)
                ProductEventDto oldCategoryEvent = new ProductEventDto(
                    updatedProduct.getId(),
                    updatedProduct.getProductName(),
                    oldCategoryId,
                    "REMOVE_FROM_CATEGORY"
                );
                productEventProducer.publishProductEvent(oldCategoryEvent);
                
                // Event for new category (product added)
                ProductEventDto newCategoryEvent = new ProductEventDto(
                    updatedProduct.getId(),
                    updatedProduct.getProductName(),
                    updatedProduct.getCategoryId(),
                    "ADD_TO_CATEGORY"
                );
                productEventProducer.publishProductEvent(newCategoryEvent);
            }
            
            return ResponseEntity.ok(
                ApiResponseDto.builder()
                    .isSuccess(true)
                    .message("Product updated successfully")
                    .response(updatedProduct)
                    .build()
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to update product: {}", e.getMessage());
            throw new ServiceLogicException("Failed to update product: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getAllProducts() throws ServiceLogicException {
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .response(products)
                            .message(products.size() + " results found!")
                            .build()
            );
        }catch (Exception e) {
            throw new ServiceLogicException("Unable to find products!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getProductById(String productId) throws ServiceLogicException{
        try {
            Product product = productRepository.findById(productId).orElse(null);

            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .response(product)
                            .build()
            );

        }catch (Exception e) {
            throw new ServiceLogicException("Unable to find products!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getProductByCategory(String categoryId) throws ServiceLogicException, ResourceNotFoundException {
        try {
            CategoryDto category = categoryService.getCategoryById(categoryId).getBody().getResponse();

            if (category != null){
                List<Product> products = productRepository.findByCategoryId(categoryId);

                return ResponseEntity.ok(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .response(products)
                                .message(products.size() + " results found!")
                                .build()
                );
            }

        }catch (Exception e) {
            throw new ServiceLogicException("Unable to find products!");
        }
        throw new ResourceNotFoundException("Category not found with id " + categoryId);
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> searchProducts(String searchKey) throws ServiceLogicException {
        try {
            List<Product> products = productRepository
                    .findByProductNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryNameContainingIgnoreCase(searchKey, searchKey, searchKey);

            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .response(products)
                            .message(products.size() + " results found!")
                            .build()
            );

        }catch (Exception e) {
            log.error(e.getMessage());
            throw new ServiceLogicException("Unable to find products!");
        }
    }
    
    // rabbitmq code
    public void handleCategoryCreated(CategoryEventDto categoryEventDto) {
        LOGGER.info("Processing category creation: {}", categoryEventDto.getName());
        // Logic for when a new category is created
        // For example, you might want to update some cache or perform other actions
    }

    public void handleCategoryUpdated(CategoryEventDto categoryEventDto) {
        LOGGER.info("Processing category update: {}", categoryEventDto.getName());
        
        // Find all products with this category ID
        List<Product> products = productRepository.findByCategoryId(categoryEventDto.getCategoryId());
        
        if (!products.isEmpty()) {
            LOGGER.info("Found {} products with category ID: {}", products.size(), categoryEventDto.getCategoryId());
            
            // Here you can update products if needed based on category changes
            // For example, if category name is used in products, you might want to update it
        }
    }

    public void handleCategoryDeleted(CategoryEventDto categoryEventDto) {
        LOGGER.info("Processing category deletion: {}", categoryEventDto.getName());
        
        // Find all products with this category ID
        List<Product> products = productRepository.findByCategoryId(categoryEventDto.getCategoryId());
        
        if (!products.isEmpty()) {
            LOGGER.info("Found {} products with deleted category ID: {}", products.size(), categoryEventDto.getCategoryId());
            
            // Update products to remove or change the category reference
            for (Product product : products) {
                // Set category ID to null or to a default category
                product.setCategoryId(null);
                productRepository.save(product);
                LOGGER.info("Updated product ID: {} after category deletion", product.getId());
            }
        }
    }

    private Product productDtoToProduct(ProductRequestDto requestDto, CategoryDto categoryDto) {
        return Product.builder()
                .productName(requestDto.getProductName())
                .price(requestDto.getPrice())
                .description(requestDto.getDescription())
                .imageUrl(requestDto.getImageUrl())
                .categoryId(categoryDto.getId())
                .categoryName(categoryDto.getCategoryName())
                .build();
    }

}

