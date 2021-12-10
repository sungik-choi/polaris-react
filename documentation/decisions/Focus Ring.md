# Focus Ring

## Date

February 21, 2020

## Problem space

Why we chose a JavaScript approach to the focus-ring. Problem: we needed a create a focus-ring that can be applied to focused but not active elements. Here're the core problems that need to be solved.

1. We need to be able to share our focus ring to empower cohesive design across the back office platform. Without adding to the sass API
2. Dynamically calculate ring edges to remain without the viewport
3. Allow for specific edges to remain unrounded. The current implementation assumes are four edges are rounded
4. Animate transform rather than box-shadow
5. Detect focus gained from tab rather than click
6. Overflow hidden causes the focus-ring to cut off
7. Z-index causes the focus-ring to cut off
8. Allow elements to use the after selector. Currently, the focus-ring uses the after selector of the element it's placed on
9. Overflow is created when the focused element is on a viewport edge
