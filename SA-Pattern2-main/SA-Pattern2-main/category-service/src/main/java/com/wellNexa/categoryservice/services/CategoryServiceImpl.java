package com.wellNexa.categoryservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.wellNexa.categoryservice.dtos.ApiResponseDto;
import com.wellNexa.categoryservice.dtos.CategoryEventDto;
import com.wellNexa.categoryservice.dtos.CategoryRequestDto;
import com.wellNexa.categoryservice.exceptions.CategoryAlreadyExistsException;
import com.wellNexa.categoryservice.exceptions.CategoryNotFoundException;
import com.wellNexa.categoryservice.exceptions.ResourceNotFoundException;
import com.wellNexa.categoryservice.exceptions.ServiceLogicException;
import com.wellNexa.categoryservice.messaging.CategoryEventPublisher;
import com.wellNexa.categoryservice.modals.Category;
import com.wellNexa.categoryservice.repositories.CategoryRepository;

//import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


@Component
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    
    //rabbitmq code
    private final CategoryEventPublisher categoryEventPublisher;
    
    //bidirectional 
    private static final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryEventPublisher categoryEventPublisher) {
        this.categoryRepository = categoryRepository;
        this.categoryEventPublisher = categoryEventPublisher;
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getAllCategories() throws ServiceLogicException {
        List<Category> categories = categoryRepository.findAll();
        try {
            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .response(categories)
                            .message(categories.size() + " results found!")
                            .build()
            );
        }catch (Exception e) {
            throw new ServiceLogicException("Unable to find categories!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> getCategoryById(String categoryId) throws ServiceLogicException {

        try {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            return ResponseEntity.ok(
                    ApiResponseDto.builder()
                            .isSuccess(true)
                            .response(category)
                            .build()
            );
        }catch (Exception e) {
            throw new ServiceLogicException("Unable to find category!");
        }
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> createCategory(CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException {
        try {
            if (!categoryRepository.existsByCategoryName(categoryRequestDto.getName())) {
                Category category = Category.builder()
                        .categoryName(categoryRequestDto.getName())
                        .description(categoryRequestDto.getDescription())
                        .imageUrl(categoryRequestDto.getImageUrl())
                        .build();
                categoryRepository.insert(category);
                
                // Publish category created event
                CategoryEventDto eventDto = new CategoryEventDto(
                        category.getId(),
                        category.getCategoryName(),
                        category.getDescription(),
                        "CREATE"
                );
                
                categoryEventPublisher.publishCategoryEvent(eventDto);
                return ResponseEntity.ok(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Category saved successfully!")
                                .build()
                );
            }

        }catch (Exception e) {
            throw new ServiceLogicException("Unable save category!");
        }
        throw new CategoryAlreadyExistsException("Category already exists with name " + categoryRequestDto.getName());
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> editCategory(String categoryId, CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException {
        try {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                category.setCategoryName(categoryRequestDto.getName());
                category.setDescription(categoryRequestDto.getDescription());
                category.setImageUrl(categoryRequestDto.getImageUrl());
                categoryRepository.save(category);
                
             // Publish category updated event
                CategoryEventDto eventDto = new CategoryEventDto(
                		category.getId(),
                        category.getCategoryName(),
                        category.getDescription(),
                        "UPDATE"
                );
                categoryEventPublisher.publishCategoryEvent(eventDto);
                
                return ResponseEntity.ok(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Category edited successfully!")
                                .build()
                );
            }

        }catch (Exception e) {
            throw new ServiceLogicException("Unable edit category!");
        }
        throw new CategoryNotFoundException("No category found with id " + categoryId);
    }

    @Override
    public ResponseEntity<ApiResponseDto<?>> deleteCategory(String categoryId) throws ServiceLogicException {
        try {
        	Category category = categoryRepository.findById(categoryId).orElse(null);
            if (categoryRepository.existsById(categoryId)) {
                categoryRepository.deleteById(categoryId);
                
                // Publish category deleted event
                CategoryEventDto eventDto = new CategoryEventDto(
                		category.getId(),
                        category.getCategoryName(),
                        category.getDescription(),
                        "DELETE"
                );
                categoryEventPublisher.publishCategoryEvent(eventDto);
                
                return ResponseEntity.ok(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Category deleted successfully!")
                                .build()
                );
            }

        }catch (Exception e) {
            throw new ServiceLogicException("Unable delete category!");
        }
        throw new CategoryNotFoundException("No category with id " + categoryId);
    }
    
    //bidirectional
    /**
     * Increment product count for a category when product is added
     */
    @Override
    public void incrementProductCount(String categoryId) {
        try {
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
            
            // Increment product count
            if (category.getProductCount() == null) {
                category.setProductCount(1);
            } else {
                category.setProductCount(category.getProductCount() + 1);
            }
            
            categoryRepository.save(category);
            
            log.info("Incremented product count for category {}", categoryId);
        } catch (Exception e) {
            log.error("Error incrementing product count for category {}: {}", categoryId, e.getMessage());
        }
    }

    /**
     * Decrement product count for a category when product is removed
     */
    @Override
    public void decrementProductCount(String categoryId) {
        try {
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
            
            // Decrement product count (ensure it doesn't go below 0)
            Integer currentCount = category.getProductCount();
            if (currentCount != null && currentCount > 0) {
                category.setProductCount(currentCount - 1);
                categoryRepository.save(category);
            }
            
            log.info("Decremented product count for category {}", categoryId);
        } catch (Exception e) {
            log.error("Error decrementing product count for category {}: {}", categoryId, e.getMessage());
        }
    }

}
