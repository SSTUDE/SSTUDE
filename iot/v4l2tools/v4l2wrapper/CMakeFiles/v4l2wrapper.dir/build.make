# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper

# Include any dependencies generated for this target.
include CMakeFiles/v4l2wrapper.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/v4l2wrapper.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/v4l2wrapper.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/v4l2wrapper.dir/flags.make

CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o: src/V4l2Access.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Access.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Access.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Access.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.s

CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o: src/V4l2Capture.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Capture.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Capture.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Capture.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.s

CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o: src/V4l2Device.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Device.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Device.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Device.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.s

CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o: src/V4l2MmapDevice.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2MmapDevice.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2MmapDevice.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2MmapDevice.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.s

CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o: src/V4l2Output.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Output.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Output.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2Output.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.s

CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o: src/V4l2ReadWriteDevice.cpp
CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2ReadWriteDevice.cpp

CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2ReadWriteDevice.cpp > CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.i

CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/V4l2ReadWriteDevice.cpp -o CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.s

CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o: CMakeFiles/v4l2wrapper.dir/flags.make
CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o: src/logger.cpp
CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o: CMakeFiles/v4l2wrapper.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Building CXX object CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o -MF CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o.d -o CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o -c /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/logger.cpp

CMakeFiles/v4l2wrapper.dir/src/logger.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/v4l2wrapper.dir/src/logger.cpp.i"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/logger.cpp > CMakeFiles/v4l2wrapper.dir/src/logger.cpp.i

CMakeFiles/v4l2wrapper.dir/src/logger.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/v4l2wrapper.dir/src/logger.cpp.s"
	/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/src/logger.cpp -o CMakeFiles/v4l2wrapper.dir/src/logger.cpp.s

# Object files for target v4l2wrapper
v4l2wrapper_OBJECTS = \
"CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o" \
"CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o"

# External object files for target v4l2wrapper
v4l2wrapper_EXTERNAL_OBJECTS =

libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2Access.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2Capture.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2Device.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2MmapDevice.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2Output.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/V4l2ReadWriteDevice.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/src/logger.cpp.o
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/build.make
libv4l2wrapper.a: CMakeFiles/v4l2wrapper.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Linking CXX static library libv4l2wrapper.a"
	$(CMAKE_COMMAND) -P CMakeFiles/v4l2wrapper.dir/cmake_clean_target.cmake
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/v4l2wrapper.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/v4l2wrapper.dir/build: libv4l2wrapper.a
.PHONY : CMakeFiles/v4l2wrapper.dir/build

CMakeFiles/v4l2wrapper.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/v4l2wrapper.dir/cmake_clean.cmake
.PHONY : CMakeFiles/v4l2wrapper.dir/clean

CMakeFiles/v4l2wrapper.dir/depend:
	cd /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper /home/kimsc9976/Downloads/v4l2tools/v4l2wrapper/CMakeFiles/v4l2wrapper.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/v4l2wrapper.dir/depend
