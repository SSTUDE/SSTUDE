package com.sstude.busstation.utils;

import java.util.List;

public interface ApiResponseDto<T, R> {
    List<T> _getItems();
    R of(T item);
}