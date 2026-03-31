---
title: "Embedded Systems Basics"
date: 2025-03-15
categories: ["Embedded"]
tags: ["C", "MCU", "Arduino"]
content_types: ["Reference"]
authors: ["Your Name"]
summary: "A reference guide covering GPIO, interrupts, and timer peripherals on microcontrollers."
thumbnail: ""
thumb_label: "MCU"
---

Embedded systems programming operates close to the hardware. Unlike application development, you manage memory directly, handle interrupts, and interact with peripheral registers.

## GPIO Configuration

General-Purpose Input/Output pins are the most basic peripheral. Configuring a pin involves setting its direction, pull-up/pull-down resistors, and output mode.

```c
#include <avr/io.h>
#include <util/delay.h>

void gpio_init(void) {
    // Set PB5 (Arduino Uno LED) as output
    DDRB |= (1 << PB5);
    // Enable pull-up on PD2 (button input)
    PORTD |= (1 << PD2);
}

int main(void) {
    gpio_init();

    while (1) {
        if (!(PIND & (1 << PD2))) {
            PORTB |= (1 << PB5);   // LED on
        } else {
            PORTB &= ~(1 << PB5);  // LED off
        }
        _delay_ms(10);  // Simple debounce
    }
    return 0;
}
```

## Interrupts

Polling wastes CPU cycles. Interrupts let the processor respond to events immediately while running other code in between. The interrupt service routine (ISR) should be kept as short as possible — set a flag and handle the logic in the main loop.

## Timer Peripherals

Timers generate precise delays, PWM signals, and periodic interrupts without blocking the main loop. Most microcontrollers have multiple timer modules with different bit widths. An 8-bit timer overflows at 256 counts, while a 16-bit timer reaches 65,536 — choose based on your resolution needs.

## Memory Considerations

Microcontrollers have extremely limited RAM, often measured in kilobytes. Avoid dynamic allocation (`malloc`/`free`) in embedded contexts — it leads to fragmentation. Use static arrays and compile-time sizing wherever possible. Stack overflow is a common silent failure mode on constrained devices.

## Debugging Tips

Without a full OS, debugging is challenging. Use UART to print diagnostic messages, toggle GPIO pins with an oscilloscope for timing analysis, and leverage JTAG/SWD debuggers for step-through debugging.
