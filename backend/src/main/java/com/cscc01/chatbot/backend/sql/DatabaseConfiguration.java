package com.cscc01.chatbot.backend.sql;

import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
@EnableJpaRepositories(basePackages = "com.cscc01.chatbot.backend.sql.repositories")
@EnableTransactionManagement
public class DatabaseConfiguration implements EnvironmentAware{

    // Resource resource = new ClassPathResource("/application.properties");
    // Properties props = PropertiesLoaderUtils.loadProperties(resource);
    private final Logger LOGGER = LoggerFactory.getLogger(DatabaseConfiguration.class);

    private Environment env;

    @Override
    public void setEnvironment(final Environment environment) {
        this.env = environment;
    }

    @Bean
    public DataSource dataSource() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.sqlite.JDBC");
        dataSource.setUrl("jdbc:sqlite:backend.db");
        dataSource.setUsername("admin");
        dataSource.setPassword("admin");
        return dataSource;
    }

    @Bean
    @ConditionalOnBean(name = "dataSource")
    @ConditionalOnMissingBean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[] { "com.cscc01.chatbot.backend.model" });
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        em.setJpaProperties(hibernateProperties());
        return em;
    }

    // @Bean
    // public LocalSessionFactoryBean sessionFactory() {
    //     final LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
    //     sessionFactory.setDataSource(dataSource());
    //     sessionFactory.setPackagesToScan(new String[] { "com.hibernate.query.performance.persistence.model" });
    //     sessionFactory.setHibernateProperties(hibernateProperties());

    //     return sessionFactory;
    // }

    @Bean
    @ConditionalOnMissingBean(type = "PlatformTransactionManager")
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject() );
        return transactionManager;
    }
    
    final Properties hibernateProperties() {
        final Properties hibernateProperties = new Properties();
        hibernateProperties.setProperty("hibernate.hbm2ddl.auto", "update");
        hibernateProperties.setProperty("hibernate.dialect", "com.cscc01.chatbot.backend.sql.SQLiteDialect");
        hibernateProperties.setProperty("hibernate.globally_quoted_identifiers", "true");
        hibernateProperties.setProperty("hibernate.show_sql", "true");
        return hibernateProperties;
    }

}
