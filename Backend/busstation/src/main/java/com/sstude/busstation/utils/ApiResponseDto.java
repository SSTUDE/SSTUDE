package com.sstude.busstation.utils;

import java.util.List;

public interface ApiResponseDto<Item, R> {
    List<Item> _getItems();
    R of(Item item);
}