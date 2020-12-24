package com.sscatalog.specialistsservicescatalog.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.sscatalog.specialistsservicescatalog.config.properties.JwtProperties;
import com.sscatalog.specialistsservicescatalog.utils.DateUtils;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;

@Service
public class JwtService {

    private final JwtProperties jwtProperties;

    public JwtService(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public String generateToken(long subject, int expiresInInSeconds) throws UnsupportedEncodingException {
        LocalDateTime expirationDateTime = LocalDateTime.now()
                                                        .plusSeconds(expiresInInSeconds);
        return JWT.create()
                  .withSubject(String.valueOf(subject))
                  .withExpiresAt(DateUtils.dateFromLocalDateTime(expirationDateTime))
                  .sign(Algorithm.HMAC256(jwtProperties.getSecret()));
    }

    public long getSubjectFromToken(String token) throws UnsupportedEncodingException, JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtProperties.getSecret()))
                                  .build();
        String subject = verifier.verify(token)
                                 .getSubject();
        return Long.parseLong(subject);
    }
}
