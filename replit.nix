{ pkgs }: {
	deps = with pkgs; [
		nodejs-16_x
		nodePackages.typescript-language-server
		nodePackages.node-pre-gyp
		libpng
		libjpeg
		libuuid
    /nix/store/p3a9gbsipl9ajfnxq27zpi1jq8azyq8x-python3-3.10.0rc1
		# Add more packages if you want.
	];
}