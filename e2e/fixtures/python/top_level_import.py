# @OctoLinkerResolve(<root>/python/relative/subpackage1)
from relative import subpackage1
# @OctoLinkerResolveAbove(<root>/python/relative/)

# @OctoLinkerResolve(<root>/python/relative/simple.py)
from relative import simple
# @OctoLinkerResolveAbove(<root>/python/relative/)

# @OctoLinkerResolve(<root>/python/relative/simple.py)
from relative.simple import my_func

# @OctoLinkerResolve(<root>/python/relative/subpackage1/classes)
from relative.subpackage1.classes import MyClass1

# @OctoLinkerResolve(<root>/python/relative/using_all.py)
from relative.using_all import e

# @OctoLinkerResolve(<root>/python/relative/subpackage1)
import relative.subpackage1

# @OctoLinkerResolve(<root>/python/relative/)
import relative