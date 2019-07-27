package com.cscc01.chatbot.backend.sql.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.cscc01.chatbot.backend.model.Feedback;

// @CrossOrigin
// @RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

    @Override
    @RestResource(exported = false)
    <S extends Feedback> S save(S entity);

    @Override
    @RestResource(exported = false)
    void delete(Feedback entity);

    @Override
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Feedback> entities);

    @Override
    @RestResource(exported = false)
    void deleteById(Long aLong);

    @Override
    Iterable<Feedback> findAll();  
}
