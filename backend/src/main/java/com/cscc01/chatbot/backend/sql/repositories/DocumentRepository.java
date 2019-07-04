package com.cscc01.chatbot.backend.sql.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.cscc01.chatbot.backend.model.Document;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "documents", path = "documents")
public interface DocumentRepository extends CrudRepository<Document, Long> {

    @Override
    @RestResource(exported = false)
    <S extends Document> S save(S entity);

    @Override
    @RestResource(exported = false)
    void delete(Document entity);

    @Override
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends Document> entities);

    @Override
    @RestResource(exported = false)
    void deleteById(Long aLong);

    @Query("SELECT d FROM Document d WHERE d.name = ?1")
    Document findByName(@Param("name") String name);
}
