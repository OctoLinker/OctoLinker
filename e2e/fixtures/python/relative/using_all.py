# @OctoLinkerResolve(<root>/python/relative/simple.py)
from .simple import MyClass
# @OctoLinkerResolve(<root>/python/relative/simple.py)
from relative.simple import my_func

__all__ = [
    "MyClass",
    "my_func",
    "a",
    "_B"
    "e"
]

c = 5
d = 6
globals()["e"] = 5
