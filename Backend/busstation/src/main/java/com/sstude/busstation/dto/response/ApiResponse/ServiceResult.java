package com.sstude.busstation.dto.response.ApiResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Getter;

@Getter
@JacksonXmlRootElement(localName = "ServiceResult")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ServiceResult<T> {

    @JacksonXmlProperty(localName = "msgBody")
    private MsgBody<T> msgBody;

    // Getters and setters
}