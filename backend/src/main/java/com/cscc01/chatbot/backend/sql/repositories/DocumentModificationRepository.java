package com.cscc01.chatbot.backend.sql.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.cscc01.chatbot.backend.model.DocumentModification;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "documentmodifications", path = "documentmodifications")
public interface DocumentModificationRepository extends CrudRepository<DocumentModification, Long> {

    @Override
    @RestResource(exported = false)
    <S extends DocumentModification> S save(S entity);

    @Override
    @RestResource(exported = false)
    void delete(DocumentModification entity);

    @Override
    @RestResource(exported = false)
    void deleteAll();

    @Override
    @RestResource(exported = false)
    void deleteAll(Iterable<? extends DocumentModification> entities);

    @Override
    @RestResource(exported = false)
    void deleteById(Long aLong);

    @Query("SELECT d FROM DocumentModification d WHERE d.modifiedUser = ?1")
    DocumentModification findByModifiedUser(@Param("modifiedUser") String modifiedUser);
}
