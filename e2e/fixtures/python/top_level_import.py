# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1)
from relative import subpackage1
# @Disabled OctoLinkerResolveAbove(<root>/python/relative/)

# @Disabled OctoLinkerResolve(<root>/python/relative/simple.py)
from relative import simple
# @Disabled OctoLinkerResolveAbove(<root>/python/relative/)

# @Disabled OctoLinkerResolve(<root>/python/relative/simple.py)
from relative.simple import my_func

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1/classes.py)
from relative.subpackage1.classes import MyClass1

# @OctoLinkerResolve(<root>/python/relative/using_all.py)
from relative.using_all import e

# @Disabled OctoLinkerResolve(<root>/python/relative/subpackage1)
import relative.subpackage1

# @Disabled OctoLinkerResolve(<root>/python/relative/)
import relative
