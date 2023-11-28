package com.sstude.busstation.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.util.List;

@JacksonXmlRootElement(localName = "ServiceResult")
@JsonIgnoreProperties(ignoreUnknown = true)
public interface ApiResponseDto<T, R> {
    List<T> _getItems();
    R of(T item);
}