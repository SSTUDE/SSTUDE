package com.sstude.busstation.utils;

import java.util.Map;

@FunctionalInterface
public interface MapFiller<T> {
    void fill(Map<String, String> map, T dto);
}
