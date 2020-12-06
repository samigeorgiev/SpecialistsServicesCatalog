package com.sscatalog.specialistsservicescatalog.filters;

import com.sscatalog.specialistsservicescatalog.repositories.UserRepository;
import com.sscatalog.specialistsservicescatalog.services.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    private final String AUTHORIZATION_HEADER = "Authorization";

    private final JwtService jwtService;

    private final UserRepository userRepository;

    public AuthenticationFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws
                                                                                                              IOException,
                                                                                                              ServletException {
        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (token != null) {
            try {
                long userId = jwtService.getSubjectFromToken(token);
                userRepository.findById(userId)
                              .ifPresent(user -> {
                                  Authentication authentication = new UsernamePasswordAuthenticationToken(user, token);
                                  SecurityContextHolder.getContext()
                                                       .setAuthentication(authentication);
                              });
            } catch (Exception ignored) {
            }
        }

        chain.doFilter(request, response);
    }
}
